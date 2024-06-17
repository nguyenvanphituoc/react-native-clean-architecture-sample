import {useAppTheme} from '../../../hooks/useTheme';
import React from 'react';
import {
  TextProps,
  Text as NativeText,
  I18nManager,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';

import {CustomTextVariant} from './variant';
export type {CustomTextVariant} from './variant';

export type VariantProp<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;

export type Props<T> = TextProps & {
  variant: VariantProp<T>;
  children: React.ReactNode;
};

export type TextRef = React.ForwardedRef<{
  setNativeProps(args: Object): void;
}>;

const baseScreenSize = 375; // This is an example base screen size, you can adjust this to your needs

export function scaleFont(size: number) {
  const scale = Dimensions.get('window').width / baseScreenSize;
  const newSize = size * scale;
  return Math.floor(PixelRatio.roundToNearestPixel(newSize));
}

const Text = ({variant, style, ...rest}: Props<string>, ref: TextRef) => {
  const root = React.useRef<NativeText | null>(null);
  const writingDirection = I18nManager.getConstants().isRTL ? 'rtl' : 'ltr';

  const {theme: appTheme} = useAppTheme();

  React.useImperativeHandle(ref, () => ({
    setNativeProps: (args: Object) => root.current?.setNativeProps(args),
  }));

  let font = appTheme.fonts[variant];
  // style can be an array, so we need to merge it with font
  let textStyle: Array<TextProps['style']> = [font, style];

  if (React.isValidElement(rest.children) && rest.children.type === Component) {
    const {props} = rest.children;

    // Context:   Some components have the built-in `Text` component with a predefined variant,
    //            that also accepts `children` as a `React.Node`. This can result in a situation,
    //            where another `Text` component is rendered within the built-in `Text` component.
    //            By doing that, we assume that user doesn't want to consume pre-defined font properties.
    // Case one:  Nested `Text` has different `variant` that specified in parent. For example:
    //              <Chip>
    //                <Text variant="displayMedium">Nested</Text>
    //              </Chip>
    // Solution:  To address the following scenario, the code below overrides the `variant`
    //            specified in a parent in favor of children's variant:
    if (props.variant) {
      font = appTheme.fonts[props.variant as VariantProp<typeof props.variant>];
      textStyle = [style, font];
    }

    // Case two:  Nested `Text` has specified `styles` which intefere
    //            with font properties, from the parent's `variant`. For example:
    //              <Chip>
    //                <Text style={{fontSize: 30}}>Nested</Text>
    //              </Chip>
    // Solution:  To address the following scenario, the code below overrides the
    //            parent's style with children's style:
    if (!props.variant) {
      textStyle = [style, props.style];
    }
  }

  if (typeof font !== 'object') {
    throw new Error(
      `Variant ${variant} was not provided properly. Valid variants are ${Object.keys(
        appTheme.fonts,
      ).join(', ')}.`,
    );
  }

  const fontSizes = textStyle.filter(
    item => item && item.hasOwnProperty('fontSize') !== false,
  ); // Find the first item with a valid fontSize
  const lastedFontSize = fontSizes[fontSizes.length - 1];

  if (lastedFontSize) {
    const fontSize = Number((lastedFontSize as any).fontSize);
    if (fontSize) {
      textStyle.push({
        fontSize: scaleFont(fontSize),
      });
    }
    //
    const lineHeight = Number((lastedFontSize as any).lineHeight);
    if (lineHeight) {
      textStyle.push({
        lineHeight: scaleFont(lineHeight),
      });
    }
  }

  return (
    <NativeText
      ref={root}
      style={[
        styles.text,
        {writingDirection, color: appTheme.colors.onBackground},
        textStyle,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});

Text.default = {};

type TextComponent<T> = (
  props: Props<T> & {ref?: React.RefObject<TextRef>},
) => JSX.Element;

const Component = React.forwardRef(Text) as TextComponent<never>;

export const customText = <T,>() => Component as unknown as TextComponent<T>;

export const AppText = customText<CustomTextVariant>();
