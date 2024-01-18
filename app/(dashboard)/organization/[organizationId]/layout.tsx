import {startCase} from 'lodash'

import { ReactNode } from "react";
import OrganizationControl from "./_components/organizationControl";
import { auth } from '@clerk/nextjs';

export async function generateMetadata(){
    const {orgSlug} = auth()

    return {
        title: startCase(orgSlug || 'Organization')
    }
}


const OrganizationIdLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {/* <OrganizationControl /> */}
            {children}
        </>
    );
};
export default OrganizationIdLayout;
