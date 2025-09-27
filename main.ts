input.onButtonPressed(Button.AB, function () {
    if (is_countdown) {
        let actual_led = 0

        for (let a = 3; a >= 1; a--) {

            draw_number(a)

            for (let b = 0; b <= 9; b++) {
                set_leds_color(0, actual_led, NeoPixelColors.Black)
                set_leds_color(actual_led, strip.length(), get_color_for_number(a))

                actual_led += 1

                pause(100)
            }
        }

        draw_number(0)
        set_leds_color(0, strip.length(), NeoPixelColors.Green)

        pause(250)

        set_leds_color(0, strip.length(), NeoPixelColors.Black)
        draw_number(-1)

        is_countdown = false
    }
})

input.onButtonPressed(Button.A, function () {
    if (!is_countdown) {
        a_points += 1
    }
})

input.onButtonPressed(Button.B, function() {
    if (!is_countdown) {
        b_points += 1
    }
})

function set_leds_color(start: number, end: number, color: NeoPixelColors) {
    for (let i = start; i <= end; i++) {
        set_led_color(color, i)
    }

    strip.show()
}

function set_led_color(color: NeoPixelColors, pixelOffset: number) {
    strip.setPixelColor(pixelOffset, neopixel.colors(color))
}

function get_color_for_number(num: number) {
    let color = NeoPixelColors.Black

    if (num == 3) {
        color = NeoPixelColors.Red
    } else if (num == 2) {
        color = NeoPixelColors.Orange
    } else if (num == 1) {
        color = NeoPixelColors.Yellow
    }

    return color
}

function draw_number(num: number) {
    clear_screen()

    if (num == 3) {
        led.plot(1, 0)
        led.plot(2, 0)
        led.plot(3, 0)
        led.plot(3, 1)
        led.plot(2, 2)
        led.plot(3, 2)
        led.plot(3, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    } else if (num == 2) {
        led.plot(1, 0)
        led.plot(2, 0)
        led.plot(3, 0)
        led.plot(3, 1)
        led.plot(2, 2)
        led.plot(1, 2)
        led.plot(1, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    } else if (num == 1) {
        led.plot(2, 0)
        led.plot(1, 1)
        led.plot(2, 1)
        led.plot(2, 2)
        led.plot(2, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    } else if (num == 0) {
        led.plot(1, 0)
        led.plot(2, 0)
        led.plot(3, 0)
        led.plot(1, 1)
        led.plot(3, 1)
        led.plot(1, 2)
        led.plot(3, 2)
        led.plot(1, 3)
        led.plot(3, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    }
}

function clear_screen() {
    for (let x = 0; x <= 4; x++) {
        for (let y = 0; y <= 4; y++) {
            led.unplot(x, y)
        }
    }
}

function draw_leds_for_player(points: number, color: NeoPixelColors) {
    const strip_Length = strip.length();
    const laps = Math.floor(points / strip_Length);

    const start = points - (strip_Length * laps)
    const end = (points + player_length) - (strip_Length * laps)

    set_leds_color(start, end, color)
}

basic.forever(function() {
    if (!is_countdown) {
        set_leds_color(0, strip.length(), NeoPixelColors.Black)

        draw_leds_for_player(a_points, NeoPixelColors.Red)
        draw_leds_for_player(b_points, NeoPixelColors.Blue)
    }
})

let strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)

let is_countdown = true

let a_points = 0
let b_points = 0

const player_length = 2