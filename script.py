import sys,json

def read_in() :
	lines = sys.stdin.readlines()

	return json.loads(lines[0])

def main():
	lines = read_in()
	
	total_sum_inArray = 0
	for item in lines :
		total_sum_inArray += item

	print total_sum_inArray

if __name__ == '__main__':
	while True:
		main()
