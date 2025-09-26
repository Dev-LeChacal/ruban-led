def on_button_pressed_a():
    change_led_color(5, NeoPixelColors.ORANGE)
    
input.on_button_pressed(Button.A, on_button_pressed_a)

def change_led_color(color: NeoPixelColors, position: number):
    strip.set_pixel_color(position, color)

strip = neopixel.create(DigitalPin.P0, 30, NeoPixelMode.RGB)