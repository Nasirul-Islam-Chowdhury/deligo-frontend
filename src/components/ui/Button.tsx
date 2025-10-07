import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  disabled,
  style,
  ...rest
}) => {
  return (
    <button
      disabled={loading || disabled}
      style={{
        width: "100%",
        padding: "0.85rem",
        borderRadius: "5px",
        border: "none",
        background: loading ? "#bbb" : "#fff",
        color: "#181818",
        fontWeight: "bold",
        fontSize: "1.08rem",
        cursor: loading || disabled ? "not-allowed" : "pointer",
        opacity: loading || disabled ? 0.7 : 1,
        marginBottom: "1rem",
        transition: "background 0.2s, color 0.2s",
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <span>
          <span
            style={{
              marginRight: "0.5rem",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            {/* Simple spinner */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#181818"
              style={{ display: "inline-block" }}
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="3">
                  <circle strokeOpacity=".3" cx="18" cy="18" r="18" />
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
