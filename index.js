import { RegisterModule } from 'starterkit/index';
import Contact from './screens/Contact';
import TopUpPayment from './screens/TopUpPayment';
import PaymentMethod from './screens/PaymentMethod';
import PaymentValidator from './screens/PaymentValidator';
import TopUpInternetBanking from './screens/TopUpInternetBanking';
import TopUpPaymentGateway from './screens/TopUpPaymentGateway';
import TopUpPaymentCard from './screens/TopUpPaymentCard';

import config from './package.json';

RegisterModule(
  config.name,
  {
    title: config.title,
    icon: config.icon,
    screen: `${config.name}_Contact`,
    navigatorStyle: {
      screenBackgroundColor: 'white',
      navBarBackgroundColor: 'white',
      tabBarHidden: true
    },
    previewCommit: true,
    previewActions: []
  },
  {
    Contact,
    TopUpPayment,
    PaymentMethod,
    PaymentValidator,
    TopUpInternetBanking,
    TopUpPaymentCard,
    TopUpPaymentGateway
  }
);
