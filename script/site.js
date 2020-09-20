var kzzn = kzzn || {};
kzzn.site = kzzn.site || {};

$(function (){

	// initialize js components
	kzzn.util.initComponents();

	// attach key-press events to various elements
	kzzn.util.attachKeyEvents();

	// inject all text content into page.
	kzzn.txt.injectText();

	// triggered on the "+" icon when adding participant.
	kzzn.site.addParticipant = function(button) {
		let input_name = $(button).siblings('#input_name'),
			input_count = $(button).siblings('#input_count'),
			name = $.trim(input_name.val()),
			count = input_count.val(),
			tbody = $('#participant_list tbody'),
			table = tbody.closest('table'),
			isValid = kzzn.util.participantList_validateRow(tbody, name, count); // validate inputs 

		if(isValid){
			kzzn.util.participantList_addRow(tbody, name, count); // add row if valid
			input_name.val('').focus();
			kzzn.util.participantList_summarize(table)
		}
		else{
			console.log('participant invalid');
		}
	}

	// triggered on trash icon click per participant row.
	kzzn.site.removeParticipant = function(button){
		let removedRow = button.closest('tr'),
			table = removedRow.closest('table');

		kzzn.util.participantList_removeRow(removedRow, table);
		kzzn.util.participantList_summarize(table);
	}


	var _sidePotCount = 0;
	
	$('#versionInfo').on('click', function(e) { kzzn.util.loadHardCodedData(); });
	
	// start button : correct number if num > 25 OR num < 2. display attendant names and payment inputs.
	$('.btn_start').on('click', function(e) {
		var numOfAttendants =  parseInt($('#input_attendNum').val());
		appendAttendantInfo(numOfAttendants < 2 ? 2 : numOfAttendants > 25 ? 25 : numOfAttendants)
	});

	// append attendant names and payment inputs to form 
	function appendAttendantInfo(numOfAttendants){
		var payersDiv = $('#panel_payers');
		$(payersDiv).empty();

		for(i = 0 ; i < numOfAttendants ; i++){
			payersDiv.append(kzzn.view.appendAttendantRow(i));	
		}
				
		$(payersDiv).append(kzzn.view.appendButtonsDiv());

		// calculate button: calculate for every memeber of the party, how much money he should transfer to who
		$('.btn_calculate').on('click', function(e) { calcPayments(); });

		// add side pot button: add side pot when someone pays for something that is'nt shared with the entire group.
		$('.btn_addSidePot').on('click', function(e) { addSidePotRow(); });

		// check for name validity and availability. add number to already existing name and enable buttons
		$('.attendantName').on('blur', function () { kzzn.util.validate_inputs(); });
	}

	// calculate the funds transaction
	function calcPayments () {
		var payersPanel = $('#panel_payers'),
			attndCount = parseInt($('#input_attendNum').val()),
			attndData = [],
			sum = 0;
			precalculatedEachShare = 0;

			payersPanel.find('.attendantRow').each(function (i, el){
				var attendant = $(el),
					atndName = attendant.find('.attendantName').val(),
					atndPaid = parseInt(attendant.find('.attendantPaid').val() === '' ? 0 : attendant.find('.attendantPaid').val());
				sum += atndPaid;
				attndData.push({Name: atndName, Paid: atndPaid});
			});

			precalculatedEachShare = sum / attndCount;

			var summaryContent = kzzn.view.buildSummaryContent(attndCount, sum, precalculatedEachShare);
			var tableContent = kzzn.calc.buildTableContent(precalculatedEachShare, attndData);

			showResult(summaryContent, tableContent);
	}
	
	// switch between panels to display the html content
	function showResult(summaryContent, tableContent){

		var resultPanel = $('#panel_result'),
			payersPanel = $('#panel_payers'),
			buttonContent = kzzn.view.btnDiv_backAndCopy();
		
		resultPanel.find('tbody').empty();
		resultPanel.find('#div_summaryInfo').remove();
		resultPanel.find('.div_actionsBtns').remove();

		resultPanel.show();
		payersPanel.hide();

		resultPanel.append(summaryContent + buttonContent);
		resultPanel.find('tbody').append(tableContent);

		$('.btn_shareViaWhatsApp').attr('href', `whatsapp://send?text=${kzzn.util.transactionsAsText}`);
		
		$('.btn_back').on('click', function(){
			resultPanel.hide();
			payersPanel.show();
		})

		$('.btn_copyToClipboard').on('click', function(){
			$('#copiableTransaction').select();
			document.execCommand("copy");
		})
	}

	function addSidePotRow() {
		var payersPanel = $('#panel_payers'),
			attendantRow = payersPanel.find('.attendantRow'),
			buttonsDiv = payersPanel.find('.buttonsDiv').detach();
			attndNames = [];

		$.each(attendantRow, function (i, el){
			let attendant = $(el),
				atndName = attendant.find('.attendantName').val();
			attndNames.push(atndName);
		});

		$('#panel_payers').append(kzzn.view.getEmptySidePotRow(++_sidePotCount, attndNames));

		var thisSidepot = payersPanel.find('#sidepot_'+_sidePotCount+'');
		thisSidepot.find('.sidePot_participant_multiselect').multiselect({}); // init multiselection

		$(payersPanel).append(buttonsDiv);
		buttonsDiv.find('button').attr('disabled', true); // disable buttons until validated
		$('.attendantName').attr('disabled', true) // disable name input once siderows are present

		// display selected name on DropDown and validate sidepots
		$('.dropdown-item').on('click', function(){
			$(this).parents('.sidepot_whoPaid').find('button').text(this.text).addClass('valid');
			kzzn.util.validate_sidePotRows();
		});
		
		// validate sidepots
		$('.multiselect-container input[type="checkbox"]').on('change', function () { kzzn.util.validate_sidePotRows(); });

		// remove sidepot row - enable\disabled buttons and name inputs if no more sidepots left
		$('.removeSidePot').off('click').on('click', function () { --_sidePotCount;  kzzn.util.removeSidePotRow(this); });
	}
})
