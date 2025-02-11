import { ReactElement } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import GreenOverlay from '@/components/GreenOverlay';

const today = toDateId(new Date());

export default function CalendarScreen(): ReactElement {

    return (
        <View style={styles.container}>
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
                    calendarActiveDateRanges={[
                        {
                            startId: today,
                            endId: today,
                        },
                    ]}
                    calendarMonthId={today}
                    // calendarInitialMonthId={today}
                    onCalendarDayPress={() => {}}
                    theme={calendarTheme}
                />
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
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logo: {
        width: 200,
        height: 100
    },
    calendarContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    }
});

const linearAccent = "#585ABF";
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
        idle: ({  }) => ({
            container: {
                backgroundColor: "transparent",
                borderRadius: 4
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
            
        }),
        active: () => ({
            container: {
                backgroundColor: "#1bb100"
            },
        })
    }
};