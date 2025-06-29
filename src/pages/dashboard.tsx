import { PrivateRoute } from "@/App";
import CourseBoard from "@/components/dashboard/CourseBoard";
import DefaultLayout from "@/layouts/default";
import { FC } from "react";

const DashboardPage: FC = () => {
    return (
        <div>
            <PrivateRoute>
                <DefaultLayout>
                    <CourseBoard />
                </DefaultLayout>
            </PrivateRoute>

        </div>
    );
};

export default DashboardPage;