import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllSubscriptionPlans from "./pages/AllSubscriptionPlans";
import Codes from "./pages/Codes";
import CreateInvoice from "./pages/CreateInvoice";
import Durations from "./pages/Durations";
import InvoiceListing from "./pages/InvoiceListing";
import Login from "./pages/Login";
import SubscriptionPlan from "./pages/SubscriptionPlan";
import UserDash from "./pages/UserDash";
import UserDashTwo from "./pages/UserDashTwo";

const Routes = () => {
    return (
        <Router>
            {/* <ScrollToTop> */}
            <Switch>
                <Route path="/" exact component={UserDash} />
                <Route path="/login" component={Login} />
                <Route path="/invoice-list" component={InvoiceListing} />
                <Route path="/create-invoice" component={CreateInvoice} />
                {/* <Route path="/user-dash"  component={UserDash} /> */}
                <Route path="/user-dash-two" component={UserDashTwo} />
                <Route path="/codes" component={Codes} />
                <Route path="/durations" component={Durations} />
                <Route path="/subscriptions" component={SubscriptionPlan} />
                <Route path="/all-subscriptions" component={AllSubscriptionPlans} />
                <Route path="*" component={UserDash} />
            </Switch>
            {/* </ScrollToTop> */}
        </Router>
    );
};

export default Routes;
