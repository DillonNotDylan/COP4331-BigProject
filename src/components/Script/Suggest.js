const outter_circle = ['C_maj', 'G_maj', 'D_maj', 'A_maj', 'E_maj', 'B_maj', 'F_sharp_maj', 'C_sharp_maj', 'G_sharp_maj', 'D_sharp_maj', 'A_sharp_maj', 'F_maj']
const inner_circle = ['A_min', 'E_min', 'B_min', 'F_sharp_min', 'C_sharp_min', 'G_sharp_min', 'E_flat_min', 'B_flat_min', 'F_min', 'C_min', 'G_min', 'D_min']

const key_to_number = ['A', 'A_sharp', 'B', 'C', 'C_sharp', 'D', 'D_sharp', 'E', 'F', 'F_sharp', 'G', 'G_sharp']

// Not currently being used
// const maj_min_number = {'A_maj':0, 'A_sharp_maj':1, 'B_maj':2, 'C_maj':3, 'C_sharp_maj':4, 'D_maj':5, 'D_sharp_maj':6, 'E_maj':7, 'F_maj':8, 'F_sharp_maj':9, 'G_maj':10, 'G_sharp_maj':11, 'A_min':12, 'A_sharp_min':13, 'B_min':14, 'C_min':15, 'C_sharp_min':16, 'D_min':17, 'D_sharp_min':18, 'E_min':19, 'F_min':20, 'F_sharp_min':21, 'G_min':22, 'G_sharp_min':23}
// const number_to_key = {'1':'A', '2':'A_sharp', '3':'B', '4':'C', '5':'C_sharp', '6':'D', '7':'D_sharp', '8':'E', '9':'F', '10':'F_sharp', '11':'G', '12':'G_sharp'}

const quality = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim']

// TODO: Fix rest of modes (complete: major[1], minor[6])
const scales = [[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'C', 'D', 'D_sharp', 'F', 'G', 'A'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],

[['A', 'B', 'C', 'D', 'E', 'F', 'G'],
['A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp'],
['B', 'C_sharp', 'D', 'E', 'F_sharp', 'G', 'A'],
['C', 'D', 'D_sharp', 'F', 'G', 'G_sharp', 'A_sharp'],
['C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A', 'B'],
['D', 'E', 'F', 'G', 'A', 'A_sharp', 'C'],
['D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp'],
['E', 'F_sharp', 'G', 'A', 'B', 'C', 'D'],
['F', 'G', 'G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp'],
['F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D', 'E'],
['G', 'A', 'A_sharp', 'C', 'D', 'D_sharp', 'F'],
['G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp']],

[['A', 'A_sharp', 'C', 'D', 'D_sharp', 'F', 'G'],
['A_sharp', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'F', 'F_sharp', 'G_sharp', 'A_sharp', 'C'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C_sharp'],
['D_sharp', 'F', 'G', 'G_sharp', 'A_sharp', 'C', 'D'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'F'],
['G', 'A', 'B', 'C', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'G']],
]

let progression = []

let suggestions = []

// A conversion function that will return the chord letter and quality of the chord
const get_chord = (chord_degree, key, mode) => {
	if (chord_degree == 1) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][0]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {

			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][0]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {

			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][0]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][0]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][0]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][0]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][0]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		2) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][1]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][1]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][1]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][1]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][1]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][1]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][1]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		3) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][2]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][2]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][2]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][2]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][2]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][2]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][2]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		4) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][3]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][3]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][3]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][3]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][3]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][3]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][3]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		5) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][4]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][4]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][4]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][4]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][4]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][4]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][4]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		6) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][5]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][5]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][5]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][5]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][5]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][5]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][5]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}

	if (chord_degree ==
		7) {
		if (mode == 1) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[0][key_index][6]
			let chord_quality = quality[6]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 2) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[1][key_index][6]
			let chord_quality = quality[0]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 3) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[2][key_index][6]
			let chord_quality = quality[1]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 4) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[3][key_index][6]
			let chord_quality = quality[2]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 5) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[4][key_index][6]
			let chord_quality = quality[3]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 6) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[5][key_index][6]
			let chord_quality = quality[4]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}

		if (mode == 7) {
			let key_index = key_to_number.indexOf(key)
			let chord_letter = scales[6][key_index][6]
			let chord_quality = quality[5]
			let resulting_chord = chord_letter + "_" + chord_quality
			return resulting_chord
		}
	}
}

// Using circle of 5ths neighbors for suggestions
const circleOfFifths = (chord) => {
	for (let i = 0; i < 12; i++) {
		if (outter_circle[i] == chord) {
			if (i == 0) {
				if (!suggestions.includes(outter_circle[i + 1])) {
					suggestions.push(outter_circle[i + 1])
				}
				if (!suggestions.includes(inner_circle[i])) {
					suggestions.push(inner_circle[i])
				}
			}

			else if (i == 11) {
				if (!suggestions.includes(outter_circle[i - 1])) {
					suggestions.push(outter_circle[i - 1])
				}
				if (!suggestions.includes(inner_circle[i])) {
					suggestions.push(inner_circle[i])
				}
			}

			else {
				if (!suggestions.includes(outter_circle[i - 1])) {
					suggestions.push(outter_circle[i - 1])
				}
				if (!suggestions.includes(outter_circle[i + 1])) {
					suggestions.push(outter_circle[i + 1])
				}
				if (!suggestions.includes(inner_circle[i])) {
					suggestions.push(inner_circle[i])
				}
			}
		}

		if (inner_circle[i] == chord) {
			if (i == 0) {
				if (!suggestions.includes(inner_circle[i + 1])) {
					suggestions.push(inner_circle[i + 1])
				}
				if (!suggestions.includes(outter_circle[i])) {
					suggestions.push(outter_circle[i])
				}
			}

			else if (i == 11) {
				if (!suggestions.includes(inner_circle[i - 1])) {
					suggestions.push(inner_circle[i - 1])
				}
				if (!suggestions.includes(outter_circle[i])) {
					suggestions.push(outter_circle[i])
				}
			}

			else {
				if (!suggestions.includes(inner_circle[i + 1])) {
					suggestions.push(inner_circle[i + 1])
				}
				if (!suggestions.includes(inner_circle[i - 1])) {
					suggestions.push(inner_circle[i - 1])
				}
				if (!suggestions.includes(outter_circle[i])) {
					suggestions.push(outter_circle[i])
				}
			}
		}
	}
}

// Using the rules of functional harmony for suggestions
const functionalHarmony = (key, chord_position, mode) => {
	let degree1 = get_chord(1, key, mode)
	let degree2 = get_chord(2, key, mode)
	let degree3 = get_chord(3, key, mode)
	let degree4 = get_chord(4, key, mode)
	let degree5 = get_chord(5, key, mode)
	let degree6 = get_chord(6, key, mode)
	let degree7 = get_chord(7, key, mode)

	// print('1 is: ', degree1)
	// print('2 is: ', degree2)
	// print('3 is: ', degree3)
	// print('4 is: ', degree4)
	// print('5 is: ', degree5)
	// print('6 is: ', degree6)
	// print('7 is: ', degree7)

	if (chord_position == 1) {
		if (!suggestions.includes(degree1)) {
			suggestions.push(degree1)
		}
		if (!suggestions.includes(degree5)) {
			suggestions.push(degree5)
		}
	}

	if (chord_position == 2) {
		if (!suggestions.includes(degree2)) {
			suggestions.push(degree2)
		}
		if (!suggestions.includes(degree3)) {
			suggestions.push(degree3)
		}
		if (!suggestions.includes(degree4)) {
			suggestions.push(degree4)
		}
		if (!suggestions.includes(degree5)) {
			suggestions.push(degree5)
		}
		if (!suggestions.includes(degree6)) {
			suggestions.push(degree6)
		}
		if (!suggestions.includes(degree7)) {
			suggestions.push(degree7)
		}
	}

	if (chord_position == 3) {
		if (!suggestions.includes(degree2)) {
			suggestions.push(degree2)
		}
		if (!suggestions.includes(degree4)) {
			suggestions.push(degree4)
		}
		if (!suggestions.includes(degree6)) {
			suggestions.push(degree6)
		}
	}

	if (chord_position == 4) {
		if (!suggestions.includes(degree2)) {
			suggestions.push(degree2)
		}
		if (!suggestions.includes(degree5)) {
			suggestions.push(degree5)
		}
		if (!suggestions.includes(degree7)) {
			suggestions.push(degree7)
		}
	}
}

// Using popular chord progressions for suggestions
const commonProgressions = (key, chord, chord_position) => {
	// Look at the position of the chord

	// Find progressions that match current progression up to current chord (the chord we want a suggestion for)

	// Use current chord position index each progression that matches, append all of those indexes 
}

// Rank the chords by popularity
const sortSuggestions = (key, chord, chord_position) => {
}

// Log all chord suggestions to the console
const displaySugestions = () => {
	// inside displaySuggestions
	for (let i = 0; i < suggestions.length; i++) {
		console.log(suggestions[i]);
	}
}

// A master function to collect data from all other functions
const getAllSuggestions = (chord1, chord2, chord3, chord4, chord_position, key, mode) => {

	let chord = "H";
	suggestions = []
	
	if (chord_position == 1)
		chord = chord1
	else if (chord_position == 2)
		chord = chord2
	else if (chord_position == 3)
		chord = chord3
	else if (chord_position == 4)
		chord = chord4

	circleOfFifths(chord);
	functionalHarmony(key, chord_position, mode);
	commonProgressions(key, chord, chord_position);
	sortSuggestions(key, chord, chord_position);
	displaySugestions();
	return suggestions
}

// const test = () => console.log("Testy testy")

export default getAllSuggestions
// Parameters
//      Chord1 (str), Chord2(str), Chord3(str), Chord4(str), Chord_Position(int), Key(str), Mode(int)

// getAllSuggestions('C_maj', 'NULL', 'NULL', 'G_maj', 1, 'C', 1);