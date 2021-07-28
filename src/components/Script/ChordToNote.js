const key_to_number = ['A', 'A_sharp', 'B', 'C', 'C_sharp', 'D', 'D_sharp', 'E', 'F', 'F_sharp', 'G', 'G_sharp']

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

[['A', 'B', 'C', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C_sharp', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'D_sharp', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp'],
['E', 'F_sharp', 'G', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'G_sharp', 'A_sharp', 'C', 'D', 'E_sharp'],
['F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B_sharp', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp']],

[['A', 'A_sharp', 'C', 'D', 'E', 'F', 'G'],
['A_sharp', 'B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp'],
['B', 'C', 'D', 'E', 'F_sharp', 'G', 'A'],
['C', 'C_sharp', 'D_sharp', 'F', 'G', 'G_sharp', 'A_sharp'],
['C_sharp', 'D', 'E', 'F_sharp', 'G_sharp', 'A', 'B'],
['D', 'D_sharp', 'F', 'G', 'A', 'A_sharp', 'C'],
['D_sharp', 'E', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp'],
['E', 'F', 'G', 'A', 'B', 'C', 'D'],
['F', 'F_sharp', 'G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp'],
['F_sharp', 'G', 'A', 'B', 'C_sharp', 'D', 'E'],
['G', 'G_sharp', 'A_sharp', 'C', 'D', 'D_sharp', 'F'],
['G_sharp', 'A', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp']],

[['A', 'B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp'],
['A_sharp', 'B_sharp', 'C', 'D', 'E_sharp', 'F', 'G'],
['B', 'C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp'],
['C', 'D', 'E', 'F_sharp', 'G', 'A', 'B'],
['C_sharp', 'D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'B_sharp'],
['D', 'E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp'],
['D_sharp', 'E_sharp', 'F', 'G', 'A_sharp', 'B_sharp', 'C'],
['E', 'F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp'],
['F', 'G', 'A', 'B', 'C', 'D', 'E'],
['F_sharp', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp', 'D_sharp', 'E_sharp'],
['G', 'A', 'B', 'C_sharp', 'D', 'E', 'F_sharp'],
['G_sharp', 'A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp']],

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'E', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'C_sharp', 'D_sharp'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'D_sharp'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp']],

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

[['A', 'B', 'C_sharp', 'D', 'E', 'F_sharp', 'G'],
['A_sharp', 'B_sharp', 'C', 'D_sharp', 'E_sharp', 'F', 'G_sharp'],
['B', 'C_sharp', 'D_sharp', 'E', 'F_sharp', 'G_sharp', 'A'],
['C', 'D', 'E', 'F', 'G', 'A', 'A_sharp'],
['C_sharp', 'D_sharp', 'E_sharp', 'F_sharp', 'G_sharp', 'A_sharp', 'B'],
['D', 'E', 'F_sharp', 'G', 'A', 'B', 'C'],
['D_sharp', 'E_sharp', 'F', 'G_sharp', 'A_sharp', 'B_sharp', 'C_sharp'],
['E', 'F_sharp', 'G_sharp', 'A', 'B', 'C_sharp', 'D'],
['F', 'G', 'A', 'A_sharp', 'C', 'D', 'D_sharp'],
['F_sharp', 'G_sharp', 'A_sharp', 'B', 'C_sharp', 'D_sharp', 'E'],
['G', 'A', 'B', 'C', 'D', 'E', 'F'],
['G_sharp', 'A_sharp', 'C', 'C_sharp', 'D_sharp', 'F', 'F_sharp']],
]

const getChordNotes = (chord) => {

	let chordNotes = []
	let chordRoot = ''
	let chordRootNumber = -1

	// chord contains sharp root
	if(chord.includes('sharp')) {
		chordRoot = chord[0] + '_sharp'
		chordRootNumber = key_to_number.indexOf(chordRoot)
	} else {
		chordRoot = chord[0]
		chordRootNumber = key_to_number.indexOf(chordRoot)
	}

	if(chord.includes('min')) {
		if(chord.includes('7')){
			chordNotes.push(scales[5][chordRootNumber][0])
			chordNotes.push(scales[5][chordRootNumber][2])
			chordNotes.push(scales[5][chordRootNumber][4])
			chordNotes.push(scales[5][chordRootNumber][6])
			return chordNotes
		}
		else {
			chordNotes.push(scales[5][chordRootNumber][0])
			chordNotes.push(scales[5][chordRootNumber][2])
			chordNotes.push(scales[5][chordRootNumber][4])
			return chordNotes
		}
	}

	if(chord.includes('maj')) {
		if(chord.includes('7')) {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[0][chordRootNumber][2])
			chordNotes.push(scales[0][chordRootNumber][4])
			chordNotes.push(scales[0][chordRootNumber][6])
			return chordNotes
		}
		else {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[0][chordRootNumber][2])
			chordNotes.push(scales[0][chordRootNumber][4])
			return chordNotes
		}
	}

	if(chord.includes('dom')) {
		chordNotes.push(scales[0][chordRootNumber][0])
		chordNotes.push(scales[0][chordRootNumber][2])
		chordNotes.push(scales[0][chordRootNumber][4])
		chordNotes.push(scales[0][chordRootNumber][6])
		return chordNotes
	}

	if(chord.includes('dim')) {
		if(chord.includes('7')) {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[5][chordRootNumber][2])
			chordNotes.push(scales[4][chordRootNumber][3])
			chordNotes.push(scales[0][chordRootNumber][6])
			return chordNotes
		}

		else {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[5][chordRootNumber][2])
			chordNotes.push(scales[4][chordRootNumber][3])
			return chordNotes
		}
	}

	if(chord.includes('sus')) {
		if(chord.includes('2')) {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[0][chordRootNumber][1])
			chordNotes.push(scales[0][chordRootNumber][4])
		}
		else {
			chordNotes.push(scales[0][chordRootNumber][0])
			chordNotes.push(scales[0][chordRootNumber][3])
			chordNotes.push(scales[0][chordRootNumber][4])
		}
	}
}

export default getChordNotes