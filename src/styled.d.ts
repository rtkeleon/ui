// import original module declarations
import 'styled-components';

import { GlobalTheme } from './theme';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends GlobalTheme {}
}
