interface HeadingProps {
  title: string;
  description?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold leading-none tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground min-w-36">
        {description}
      </p>
    </div>
  );
};
