function runSimulation() {
	document.getElementById("run_simulation").disabled = true
	simulation.run()
}

function pauseSimulation() {
	document.getElementById("run_simulation").disabled = false
	simulation.pause()
}

function stopSimulation() {
	document.getElementById("run_simulation").disabled = false
	simulation.stop()
}

function stepSimulation() {
	simulation.step()
}

function clearSimulation(){
	simulation.clear()
	document.getElementById("run_simulation").disabled = false
}

function saveStatistics() {
	simulation.saveStatistics()
}