import $ from 'jquery';

// Get CSRF token, include as a header in non-GET requests.
var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

// Create simulation
export const postSimulationSummary = simulation => (
    $.ajax({
        url: '/api/simulation_summary',
        method: 'POST',
        headers: { 'X-CSRF-Token': AUTH_TOKEN },
        data: { simulation }
    })
);

// Show simulation summaries
export const getSimulationSummaries = user => (
    $.ajax({
        url: '/api/simulation_summary',
        method: 'GET',
        data: { user }
    })
);
