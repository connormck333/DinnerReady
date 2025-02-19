import { ReactElement, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import GreenOverlay from '@/components/GreenOverlay';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CalendarEventModal from '@/components/modals/CalendarEventModal';
import { Status, UserContextType } from '@/methods/utils/interfaces';
import { getUserDinnerAttendances } from '@/methods/dinnerManagement/getUserDinnerAttendances';
import UserContext from '@/methods/context/userContext';

const GREEN = '#23da02';
const RED = '#cb4038';

export default function CalendarScreen(): ReactElement {

    const [user] = useContext(UserContext) as UserContextType;
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [attendanceDates, setAttendanceDates] = useState<any[]>([]);
    const [attendanceColors, setAttendanceColors] = useState<Map<string, string>>(new Map());
    const [selectedMonth, _setSelectedMonth] = useState<string>(toDateId(currentDate));
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string>("");

    useEffect(() => {
        (() => {
            loadDinnerCalendar();
        })();
    }, []);

    async function loadDinnerCalendar(): Promise<void> {
        const response: Status = await getUserDinnerAttendances(user.email);
        if (!response.success) {
            Alert.alert("Error", "There was an error loading your calendar.");
            return;
        }

        const dates: any[] = [];
        const colors: Map<string, string> = new Map();
        for (let date of response.response) {
            if (!date.date) continue;
            const readableDateString: string = date.date.split("/").reverse().join("-");
            dates.push({
                startId: readableDateString,
                endId: readableDateString
            });
            colors.set(readableDateString, date.attending ? GREEN : RED);
        }

        setAttendanceColors(colors);
        setAttendanceDates(dates);
    }

    function setSelectedMonth(date: Date): void {
        setCurrentDate(date);
        _setSelectedMonth(toDateId(date));
    }

    function goBackOneMonth(): void {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - 1);
        setSelectedMonth(date);
    }

    function goForwardOneMonth(): void {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() + 1);
        setSelectedMonth(date);
    }

    function onCalendarDayPress(dateId: string): void {
        setSelectedDate(dateId);
        setModalOpen(true);
    }

    function addNewEventToCalendar(attending: boolean): void {
        const dates = [...attendanceDates];
        const colors = new Map(attendanceColors);
        dates.push({
            startId: selectedDate,
            endId: selectedDate
        });
        colors.set(selectedDate, attending ? GREEN : RED);

        setAttendanceColors(colors);
        setAttendanceDates(dates);
    }

    const calendarTheme: CalendarTheme = {
        rowMonth: {
            container: {
                height: 40
            },
            content: {
                fontSize: 22,
                fontWeight: '500',
            }
        },
        rowWeek: {
            container: {
                height: 40
            }
        },
        itemWeekName: {
            content: {
                fontSize: 18,
                fontWeight: '500'
            }
        },
        
        itemDay: {
            idle: ({ id }) => ({
                container: {
                    backgroundColor: attendanceColors.get(id) || '#fff'
                },
                content: {
                    fontSize: 16
                }
            }),
            today: () => ({
                container: {
                    backgroundColor: "#fcb825"
                },
                content: {
                    color: "#000",
                    fontSize: 16
                }
            }),
            active: ({ id }) => ({
                container: {
                    backgroundColor: attendanceColors.get(id) || '#fff'
                },
                content: {
                    color: "#000",
                    fontSize: 16
                }
            })
        }
    };

    return (
        <View style={styles.container}>
            <CalendarEventModal
                visible={[modalOpen, setModalOpen]}
                date={selectedDate}
                callback={addNewEventToCalendar}
            />
            <GreenOverlay
                height={150}
                style={styles.overlay}
            >
                <Image
                    source={require("../../assets/images/Logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </GreenOverlay>
            <View style={styles.calendarContainer}>
                <Calendar
                    calendarActiveDateRanges={attendanceDates}
                    calendarMonthId={selectedMonth}
                    onCalendarDayPress={onCalendarDayPress}
                    theme={calendarTheme}
                />
                <View style={styles.btnsContainer}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goBackOneMonth}
                    >
                        <MaterialIcons name="chevron-left" size={25} color="#fff" />
                        <Text style={styles.btnText}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={goForwardOneMonth}
                    >
                        <Text style={styles.btnText}>Next</Text>
                        <MaterialIcons name="chevron-right" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    overlay: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logo: {
        width: 130,
        height: 100
    },
    calendarContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    btnsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderColor: '#DDDDDD'
    },
    btn: {
        width: '30%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#005C00',
        borderRadius: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: '#003c00',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnText: {
        fontSize: 18,
        color: '#ebebeb',
        fontWeight: '500'
    },
});