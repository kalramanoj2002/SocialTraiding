// Saves options to chrome.storage
function save_options() {
  var s = document.getElementById('timings').value;
  chrome.storage.sync.set({
    'selectedTimings': s
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 30000);
  });
}

// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    'selectedTimings': 35000,
  }, function(items) {
    document.getElementById('timings').value = items.selectedTimings;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);