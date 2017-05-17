import time

from neopixel import *


# LED strip configuration:
LED_COUNT      = 4      # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 5       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)

def facebook(strip, wait_ms=100):
	"""Draw rainbow that fades across all pixels at once."""
	for j in range(0,100,4):
		for i in range(strip.numPixels()):
			strip.setPixelColor(i, Color(150-j,150-j, 220))
		strip.show()
		time.sleep(wait_ms/1000.0)

# Main program logic follows:
if __name__ == '__main__':
	# Create NeoPixel object with appropriate configuration.
	strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS)
	# Intialize the library (must be called once before other functions).
	strip.begin()

	print ('Press Ctrl-C to quit.')

	facebook(strip)
	for i in range(strip.numPixels()) :
		strip.setPixelColor(i,Color(255,255,255))
	strip.show()

