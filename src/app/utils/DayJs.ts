import DayJs from "dayjs"
import es from "dayjs/locale/es"
import localizedFormat from "dayjs/plugin/localizedFormat"

DayJs.locale(es)
DayJs.extend(localizedFormat)

export { DayJs }