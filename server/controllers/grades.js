var mongoose = require('mongoose');
var Grade = mongoose.model('Grade');

module.exports = function(){
	return {
		create: function(req, res){
			var defects = req.body.defects;
			var min = 0;
			var max = 0;
			if(defects == 25){
				min = '0.5 PR (Poor)';
				max = '0.5 PR (Poor)';
			}
			else if(defects == 24){
				min = '0.5 PR (Poor)';
				max = '1.0 FR (Fair)';
			}
			else if(defects == 23){
				min = '0.5 PR (Poor)';
				max = '1.5 FR/GD (Fair/Good)';
			}
			else if(defects == 22){
				min = '0.5 PR (Poor)';
				max = '1.5 FR/GD (Fair/Good)';
			}
			else if(defects == 21){
				min = '0.5 PR (Poor)';
				max = '1.8 GD- (Good-)';
			}
			else if(defects == 20){
				min = '0.5 PR (Poor)';
				max = '1.8 GD- (Good-)';
			}
			else if(defects == 19){
				min = '0.5 PR (Poor)';
				max = '2.0 GD (Good)';
			}
			else if(defects == 18){
				min = '0.5 PR (Poor)';
				max = '2.5 GD+ (Good+)';
			}
			else if(defects == 17){
				min = '0.5 PR (Poor)';
				max = '3.0 GD/VG (Good/Very Good)';
			}
			else if(defects == 16){
				min = '0.5 PR (Poor)';
				max = '3.5 VG- (Very Good-)';
			}
			else if(defects == 15){
				min = '1.0 FR (Fair)';
				max = '4.0 VG (Very Good)';
			}
			else if(defects == 14){
				min = '1.5 FR/GD (Fair/Good)';
				max = '4.5 VG+ (Very Good+)';
			}
			else if(defects == 13){
				min = '1.8 GD- (Good-)';
				max = '5.5 FN- (Fine-)';
			}
			else if(defects == 12){
				min = '2.5 GD+ (Good+)';
				max = '6.0 FN (Fine)';
			}
			else if(defects == 11){
				min = '3.0 GD/VG (Good/Very Good)';
				max = '6.5 FN+ (Fine+)';
			}
			else if(defects == 10){
				min = '4.0 VG (Very Good)';
				max = '7.0 FN/VF (Fine/Very Fine)';
			}
			else if(defects == 9){
				min = '4.5 VG+ (Very Good+)';
				max = '7.0 FN/VF (Fine/Very Fine)';
			}
			else if(defects == 8){
				min = '5.0 VG/FN (Very Good/Fine)';
				max = '7.5 VF- (Very Fine-)';
			}
			else if(defects == 7){
				min = '6.0 FN (Fine)';
				max = '8.5 VF+ (Very Fine+)';
			}
			else if(defects == 6){
				min = '6.5 FN+ (Fine+)';
				max = '9.0 VF/NM (Very Fine/Near Mint)';
			}
			else if(defects == 5){
				min = '7.5 VF- (Very Fine-)';
				max = '9.0 VF/NM (Very Fine/Near Mint)';
			}
			else if(defects == 4){
				min = '8.5 VF+ (Very Fine+)';
				max = '9.2 NM- (Near Mint-)';
			}
			else if(defects == 3){
				min = '9.2 NM- (Near Mint-)';
				max = '9.6 NM+ (Near Mint+)';
			}
			else if(defects == 2){
				min = '9.4 NM (Near Mint)';
				max = '9.8 NM/MT (Near Mint/Mint)';
			}
			else if(defects == 1){
				min = '9.8 NM/MT (Near Mint/Mint)';
				max = '9.9 MT (Mint)';
			}
			else{
				min = '10.0 GM (Gem Mint)';
				max = '10.0 GM (Gem Mint)';
			}

			var newGrade = new Grade({minGrade: min, maxGrade: max});
			newGrade.save(function(error){
				if(error){
					res.status(400);
					res.json(error)
				}
				else{
					res.json(newGrade);
				}
			})
		}
	}
}();