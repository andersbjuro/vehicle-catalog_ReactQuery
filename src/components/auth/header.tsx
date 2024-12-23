interface HeaderProps {
  label: string;
};

export const Header = ({
  label,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-start">
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Logga in med FS Identity
      </h1>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
};
