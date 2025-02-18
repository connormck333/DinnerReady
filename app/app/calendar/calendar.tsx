import { ReactElement, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import GreenOverlay from '@/components/GreenOverlay';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CalendarEventModal from '@/components/modals/CalendarEventModal';
import { Status, UserContextType } from '@/methods/utils/interfaces';
import { getUserDinnerAttendances } from '@/methods/dinnerManagement/getUserDinnerAttendances';
import UserContext from '@/methods/context/userContext';

export default function CalendarScreen(): ReactElement {

    const [user, setUser] = useContext(UserContext) as UserContextType;
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [attendanceDates, setAttendanceDates] = useState<any[]>([]);
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

        const coloredDates: any[] = [];
        for (let date of response.response) {
            const readableDateString: string = date.date.split("/").reverse().join("-");
            coloredDates.push({
                startId: readableDateString,
                endId: readableDateString
            });
        }

        setAttendanceDates(coloredDates);
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

    return (
        <View style={styles.container}>
            <CalendarEventModal
                visible={[modalOpen, setModalOpen]}
                date={selectedDate}
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
        idle: ({ isPressed }) => ({
            container: {
                backgroundColor: isPressed ? "#eee" : "transparent"
            },
            content: {
                color: "#444",
                fontSize: 18
            },
        }),
        today: () => ({
            container: {
                backgroundColor: "#1bb100"
            },
            content: {
                color: "#000",
                fontSize: 16
            }
        }),
        active: ({  }) => ({
            container: {
                backgroundColor: "red"
            },
            content: {
                color: "#000",
                fontSize: 16
            }
        })
    }
};