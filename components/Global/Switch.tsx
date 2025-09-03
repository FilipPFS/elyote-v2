const Switch = ({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className={`w-16 h-8 flex cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
      enabled ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
    }`}
  >
    <span
      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
        enabled ? "translate-x-8" : "translate-x-0"
      }`}
    />
    <span className="sr-only">{label}</span>
  </button>
);

export default Switch;
