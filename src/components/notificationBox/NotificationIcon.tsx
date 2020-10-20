import * as React from 'react';

import { useTheme } from '../../hooks/useTheme';

import CheckCircle from '../icons/CheckCircle';
import ExclamationCircle from '../icons/ExclamationCircle';
import TimesCircle from '../icons/TimesCircle';
import InfoCircle from '../icons/InfoCircle';

interface NotificationIconProps {
  notificationType: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export const NotificationIcon: React.FunctionComponent<NotificationIconProps> = ({
  notificationType,
}) => {
  const theme = useTheme();

  switch (notificationType) {
    case 'error': {
      return <TimesCircle size="lg" color={theme.colors.red} />;
    }
    case 'warning': {
      return <ExclamationCircle size="lg" color={theme.colors.yellow} />;
    }
    case 'success': {
      return <CheckCircle size="lg" color={theme.colors.green} />;
    }
    case 'info': {
      return <InfoCircle size="lg" color={theme.colors.blue} />;
    }
    case 'default': {
      return <InfoCircle size="lg" color={theme.colors.gray} />;
    }
    default: {
      return null;
    }
  }
};
