import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
    return (
        <div className="md:ml-2 md:mr-[5rem]w md:w-full mx-auto">
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: "md:mr-[-15rem] w-full min-w-unset",
                        card: {
                            width: "100%",
                            boxSizing: "border-box",
                            margin: 0,
                            //width for small screens
                            maxWidth: "calc(90vw - 0.75rem) !important",
                        },
                        navbar:'max-w-[12rem]'
                    },
                }}
            />
        </div>
    );
};
export default SettingsPage;
