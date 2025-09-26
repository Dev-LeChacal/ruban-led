input.onButtonPressed(Button.A, function () {
    let actual_led = 0

    for (let a = 3; a >= 1; a--) {

        draw_number(a)

        for (let b = 0; b <= 9; b++) {
            set_leds_color(0, actual_led, NeoPixelColors.Black)
            set_leds_color(actual_led, strip.length(), get_color_with_number(a))

            actual_led += 1

            pause(100)
        }
    }

    draw_number(0)
    set_leds_color(0, strip.length(), NeoPixelColors.Green)
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

function get_color_with_number(num: number) {
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
    basic.clearScreen()
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

let strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)