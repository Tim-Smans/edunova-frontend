import { getCourses } from "@/api/course";
import { Course } from "@/models/course";
import { FC, useEffect, useState } from "react";
import CourseCard from "../courses/CourseCard";

const CourseBoard: FC = () => {
    const [courses, setCourses] = useState<Course[]>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();

        const fetchCourses = async () => {
            try {
                const courses = await getCourses()
                if(courses == undefined){
                    return
                }

                setCourses(courses);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
        return () => {
            controller.abort();
        };
    }, []);

    if(loading){
        return ('Loading...')
    }

    if(error != null) {
        return ('API Error: ' + error)
    }
    if(courses == null || courses.length == 0) {
        return ('No courses found')
    } 

    return(
        courses?.map(x => {
            return (
                <CourseCard description={x.description} category={x.category} targetAudience={x.targetAudience} tags={x.tags} title={x.title} imageUrl={x.imageUrl} key={x.id}/>
            )
        })
    )
}

export default CourseBoard