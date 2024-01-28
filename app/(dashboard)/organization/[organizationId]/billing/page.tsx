import { checkSubscription } from "@/lib/subscription";

import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";

import { SubscriptionButton } from "./_components/subscriptionButton";

const BillingPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className="w-full space-y-2">
            <Info isPro={isPro} />
            <Separator />
            <SubscriptionButton isPro={isPro} />
        </div>
    );
}
export default BillingPage;
