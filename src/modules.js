import { registerModules } from "./registerModules";

import DashboardModule from './modules/dashboard';
import UserModule from './modules/users';
import storeModule from './modules/store';
import ProductModule from './modules/product';
import ShopModule from './modules/shop'
import SettingModule from './modules/settings'
import SupportModule from './modules/support'
import SaleModule from './modules/sales'
import CustomerModule from './modules/customers'
import RoleModule from './modules/customers'

registerModules({
    dashboard: DashboardModule,
    store: storeModule,
    product: ProductModule,
    user: UserModule,
    shop: ShopModule,
    setting: SettingModule,
    support: SupportModule,
    sale: SaleModule,
    customer: CustomerModule,
    role: RoleModule
})

