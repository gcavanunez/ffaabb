import Image from "next/image";
import people from "../../public/images/people.png";

export default function Photos() {
  return (
    <div className="mx-auto text-center">
      <div className="mx-auto max-w-md">
        <Image src={people} alt="Como los viejos tiempos" placeholder="blur" />
      </div>
    </div>
  );
}
