input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    let actual_led: number;
    let a: number;
    
    if (is_countdown) {
        actual_led = 0
        a = 3
        while (a >= 1) {
            draw_number(a)
            for (let b = 0; b < 10; b++) {
                set_leds_color(0, actual_led, NeoPixelColors.Black)
                set_leds_color(actual_led, strip.length(), get_color_for_number(a))
                actual_led += 1
                pause(100)
            }
            a -= 1
        }
        draw_number(0)
        set_leds_color(0, strip.length(), NeoPixelColors.Green)
        pause(250)
        set_leds_color(0, strip.length(), NeoPixelColors.Black)
        draw_number(-1)
        is_countdown = false
    }
    
})

input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (!is_countdown) {
        a_points += 1
    }
    
})

input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (!is_countdown) {
        b_points += 1
    }
    
})

function set_leds_color(start: number, end: number, color: number) {
    let i = start
    while (i <= end) {
        set_led_color(color, i)
        i += 1
    }
    strip.show()
}

function set_led_color(color2: number, pixelOffset: number) {
    strip.setPixelColor(pixelOffset, neopixel.colors(color2))
}

function get_color_for_number(num: number): number {
    let color3 = NeoPixelColors.Black
    if (num == 3) {
        color3 = NeoPixelColors.Red
    } else if (num == 2) {
        color3 = NeoPixelColors.Orange
    } else if (num == 1) {
        color3 = NeoPixelColors.Yellow
    }
    
    return color3
}

function draw_number(num2: number) {
    clear_screen()
    if (num2 == 3) {
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
    } else if (num2 == 2) {
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
    } else if (num2 == 1) {
        led.plot(2, 0)
        led.plot(1, 1)
        led.plot(2, 1)
        led.plot(2, 2)
        led.plot(2, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    } else if (num2 == 0) {
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
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            led.unplot(x, y)
        }
    }
}

function draw_leds_for_player(points: number, color4: number) {
    let strip_Length = strip.length()
    let laps = Math.floor(points / strip_Length)
    let start2 = points - strip_Length * laps
    let end2 = points + player_length - strip_Length * laps
    set_leds_color(start2, end2, color4)
}

basic.forever(function on_forever() {
    
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
let player_length = 2