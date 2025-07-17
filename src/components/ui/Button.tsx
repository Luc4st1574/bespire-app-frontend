interface ButtonProps {
    href?: string;
    label?: string;
    variant?: "primary" | "outline" | "outlineG" | "ghost" | "white" | "green" | "green2" | "secondary" | "gray" | "transparent" | "red" | "red-outline";
    size?:"xs" | "sm" | "md" | "lg";
    fullMobile?: boolean;
    labelColor?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
  }
  
  const Button: React.FC<ButtonProps> = ({
    href = "#",
    label = "Click here",
    variant = "primary",
    size = "md",
    fullMobile = false,
    disabled = false,
    onClick,
    labelColor = "",
    className = "",
    type,
    children,
  }) => {
    const classes = {
      base: "inline-flex items-center justify-center font-medium rounded-full cursor-pointer ",
      variants: {
      primary: "bg-[#7B7E78] text-white hover:bg-[#697D67]",
      outline: "border-2 border-black text-black hover:font-semibold",
      outlineG: "border border-[#5B6F59] text-[#5B6F59] hover:font-semibold",
      ghost: "text-black hover:underline",
      white: "bg-white text-black",
      green: "bg-lime-200 text-[#004049]",
      green2: "bg-[#697D67] text-white hover:bg-[#697D67]",
      secondary: "bg-[#7B7E78] text-white hover:bg-[#5A5C58]",
      gray: "bg-[#E2E6E4] text-[#3F4744] hover:bg-[#C4CCC8]",
      transparent: "",
      red: "bg-red-500 text-white hover:bg-red-600",
      "red-outline": "border-1 border-red-500 text-red-500 hover:font-semibold",
      },
      sizes: {
      xs: "px-3 py-1 text-xs",
      sm: "px-3 py-2 text-xs",
      md: "px-7 py-2 text-sm",
      lg: "px-8 py-3 text-lg",
      },
    };
  
    const responsiveWidth = fullMobile ? "w-full md:w-auto" : "";
    const btnClass = `${classes.base} ${classes.variants[variant]} ${classes.sizes[size]}
     ${responsiveWidth} ${className}`;
    const labelClass = labelColor;
  
    
    return type ? (
      <button type={type} className={btnClass} onClick={onClick} disabled={disabled}>
<span className={labelClass}>{children || label}</span>
      </button>
    ) : (
      <a href={href} className={btnClass}>
      <span className={labelClass}>{children || label}</span>
      </a>
    );
  };
  
  export default Button;
  