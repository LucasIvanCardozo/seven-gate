import DayJs from "dayjs"
import es from "dayjs/locale/es"
import localizedFormat from "dayjs/plugin/localizedFormat"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

DayJs.locale(es)
DayJs.extend(utc)
DayJs.extend(timezone)
DayJs.extend(localizedFormat)

DayJs.tz.setDefault(DayJs.tz.guess())

export { DayJs }
