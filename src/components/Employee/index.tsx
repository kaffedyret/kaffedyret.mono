import Image from "next/image";
import { BiEnvelope } from "react-icons/bi";
import urlFor from "~/lib/sanity/urlFor";
import { Employee } from "~/models/schema.sanity";
import { TextBlock } from "../TextBlock";
interface Props {
  employee: Employee;
}

const IMAGE_WIDTH = 384;
const IMAGE_HEIGHT = IMAGE_WIDTH;

export function Employee({ employee }: Props) {
  return (
    <article>
      <div className="flex justify-center items-center p-10">
        <Image
          className="object-fill rounded-full overflow-hidden"
          src={urlFor(employee.image)
            .width(IMAGE_WIDTH)
            .height(IMAGE_HEIGHT)
            .url()}
          alt={employee.name}
          title={employee.name}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
      </div>

      <div className="prose">
        <h2 className="mb-1">{employee.name}</h2>
        <h3>{employee.title}</h3>

        {employee.description.nb && (
          <TextBlock>{employee.description.nb}</TextBlock>
        )}

        <a
          className="flex items-center gap-1"
          href={`mailto:${employee.email}`}
        >
          <BiEnvelope /> {employee.email}
        </a>
      </div>
    </article>
  );
}
