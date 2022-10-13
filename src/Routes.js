import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import Duration from "./pages/Duration";
import GenerateCodes from "./pages/GenerateCodes";
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
        <Route path="/generate-codes" component={GenerateCodes} />
        <Route path="/duration" component={Duration} />
        <Route path="/subscription-plan" component={SubscriptionPlan} />
      </Switch>
      {/* </ScrollToTop> */}
    </Router>
  );
};

export default Routes;
