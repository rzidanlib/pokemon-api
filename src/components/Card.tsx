import { Link } from "react-router-dom";
import { Pokemon } from "../interfaces/Pokemon";

export default function Card(props: Pokemon) {
  const { name, id, image } = props;
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow grid place-items-center">
      <img className="rounded-t-lg px-5 py-2" src={image} alt={name} />
      <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <Link to={`/pokemon/${id}`}>{name.toUpperCase()}</Link>
        </h5>
      </div>
    </div>
  );
}
