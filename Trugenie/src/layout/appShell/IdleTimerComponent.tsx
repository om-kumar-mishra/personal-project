import dayjs from "dayjs";
import { round } from "lodash";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useDispatch, useSelector } from "react-redux";
import { logout, requestRefreshToken } from "../../lib/services/hdfc_login/actions";
import { selectLastActivityTimestamp } from "../../lib/services/hdfc_login/selectors";
import { selectAccessToken } from "../../lib/services/reports/selectors";
import { IDLE_TIMEOUT, PROMPT_TIME_BEFORE_IDLE } from "../../utils/constants";

const IdleTimerComponent = ({ children }: { children: any }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);
  const lastActivityTimeStamp = useSelector(selectLastActivityTimestamp);

  const [lastTimeStamp, setLastTimeStamp] = useState<number | null>(null);

  useEffect(() => {
    if (lastActivityTimeStamp) setLastTimeStamp(lastActivityTimeStamp);
  }, [lastActivityTimeStamp]);

  const handleRefreshAPI = () => {
    if (token) dispatch(requestRefreshToken(token));
  };

  const handleActivity = () => {
    if (lastTimeStamp) {
      const currentTime = dayjs().valueOf();
      const timeDifference = (currentTime - lastTimeStamp) / 60000;
      if (round(timeDifference, 0) > 20) {
        handleRefreshAPI();
      }
    }
  };

  const handlePrompt = () => {
    window.confirm("Your session is about to expire. You'll be logged out.");
    activate();
  };

  const handleOnIdle = () => {
    dispatch(logout(token));
    window.location.reload();
  };

  const { activate } = useIdleTimer({
    onAction: handleActivity,
    onPrompt: handlePrompt,
    onIdle: handleOnIdle,
    promptBeforeIdle: Number(PROMPT_TIME_BEFORE_IDLE),
    timeout: Number(IDLE_TIMEOUT),
    events: ["keydown", "click"],
    debounce: 500,
    eventsThrottle: 500,
  });

  return <>{children}</>;
};

export default IdleTimerComponent;
