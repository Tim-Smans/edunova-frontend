import { FC } from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";
import {Chip} from "@heroui/chip";
import { Tag } from "@/models/tag";



interface CourseCardProps {
    title: string
    category: string
    targetAudience: string
    published?: boolean
    imageUrl?: string
    tags?: Tag[]
}

const CourseCard: FC<CourseCardProps> = ({ title, category, targetAudience, published, imageUrl, tags }) => {
    return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{category}</p>
        <small className="text-default-500">{targetAudience}</small>
        <h4 className="font-bold text-large">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Course cover"
          className="object-cover rounded-xl"
          src={imageUrl == null ? '' : imageUrl}
          width={270}
        />
      </CardBody>
      <CardFooter>
        {tags?.map(x => <Chip>{x.title}</Chip>)}
      </CardFooter>
    </Card>
    )
}

export default CourseCard