def on_button_pressed_ab():
    global is_countdown
    if is_countdown:
        actual_led = 0
        a = 3
        while a >= 1:
            draw_number(a)
            for b in range(10):
                set_leds_color(0, actual_led, NeoPixelColors.BLACK)
                set_leds_color(actual_led, len(strip), get_color_for_number(a))
                actual_led += 1
                pause(100)
            a -= 1
        draw_number(0)
        set_leds_color(0, len(strip), NeoPixelColors.GREEN)
        pause(250)
        set_leds_color(0, len(strip), NeoPixelColors.BLACK)
        draw_number(-1)
        is_countdown = False
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_a():
    global is_countdown, a_points
    if not is_countdown:
        a_points += 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global is_countdown, b_points
    if not is_countdown:
        b_points += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def set_leds_color(start: number, end: number, color: NeoPixelColors):
    i = start
    while i <= end:
        set_led_color(color, i)
        i += 1
    strip.show()
def set_led_color(color2: NeoPixelColors, pixelOffset: number):
    strip.set_pixel_color(pixelOffset, neopixel.colors(color2))
def get_color_for_number(num: number):
    color3 = NeoPixelColors.BLACK
    if num == 3:
        color3 = NeoPixelColors.RED
    elif num == 2:
        color3 = NeoPixelColors.ORANGE
    elif num == 1:
        color3 = NeoPixelColors.YELLOW
    return color3
def draw_number(num2: number):
    clear_screen()
    if num2 == 3:
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
    elif num2 == 2:
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
    elif num2 == 1:
        led.plot(2, 0)
        led.plot(1, 1)
        led.plot(2, 1)
        led.plot(2, 2)
        led.plot(2, 3)
        led.plot(1, 4)
        led.plot(2, 4)
        led.plot(3, 4)
    elif num2 == 0:
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
def clear_screen():
    for x in range(5):
        for y in range(5):
            led.unplot(x, y)
def draw_leds_for_player(points: number, color4: NeoPixelColors):
    strip_Length = len(strip)
    laps = Math.floor(points / strip_Length)
    start2 = points - (strip_Length * laps)
    end2 = (points + player_length) - (strip_Length * laps)
    set_leds_color(start2, end2, color4)

def on_forever():
    global is_countdown
    if not is_countdown:
        set_leds_color(0, len(strip), NeoPixelColors.BLACK)
        draw_leds_for_player(a_points, NeoPixelColors.RED)
        draw_leds_for_player(b_points, NeoPixelColors.BLUE)
basic.forever(on_forever)

strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)
is_countdown = True
a_points = 0
b_points = 0
player_length = 2