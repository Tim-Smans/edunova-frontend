import { getTenants } from "@/api/tenant";
import Tenant from "@/models/tenant";
import { makeTenantUrl } from "@/utils/domainUtils";
import { FC, useEffect, useState } from "react";


const OrganisationList: FC = () => {
    const [tenants, setTenants] = useState<Tenant[] | undefined>([])
    const [notFound, setNotFound] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchTenant = async () => {
            try {
                const tenantsList = await getTenants()

                setTenants(tenantsList);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                setError((err as Error).message);
                setNotFound(true)
            } finally {
            }
        };

        fetchTenant();
        return () => {
            controller.abort();
        };
    }, []);

    if(notFound) {
        return <>Something went wrong, no tenants found</>
    }

    return (
        <>
            <h1>Availble tenants:</h1>
            {tenants?.map(x => {
                return(
                    <div>
                        <a style={{textDecoration: "underline"}} href={makeTenantUrl(x.name)} key={x.id}>{x.name}</a>
                    </div>
                )
            })}
        </>
    )
}

export default OrganisationList