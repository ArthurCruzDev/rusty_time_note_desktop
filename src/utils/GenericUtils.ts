export const mapColorToClass = (color: string) => {
  switch (color) {
    default:
      return "bg-zinc-500";
    case "red":
      return "bg-red-700";
    case "purple":
      return "bg-purple-700";
    case "blue":
      return "bg-blue-700";
    case "green":
      return "bg-green-700";
    case "yellow":
      return "bg-yellow-700";
    case "orange":
      return "bg-orange-700";
    case "gray":
      return "bg-gray-700";
    case "black":
      return "bg-zinc-700";
  }
};
