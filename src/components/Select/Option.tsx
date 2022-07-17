type Props = React.OptionHTMLAttributes<HTMLOptionElement>;

export function Option(props: Props): JSX.Element {
  const { children, ...rest } = props;

  return <option {...rest}>{children}</option>;
}
