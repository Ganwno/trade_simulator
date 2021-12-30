import $ from 'jquery';

// Get CSRF token, include as a header in non-GET requests.
var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

// Create simulation
export const postSimulation = simulation => (
    $.ajax({
        url: '/api/simulation',
        method: 'POST',
        headers: { 'X-CSRF-Token': AUTH_TOKEN },
        data: { simulation }
    })
);

// Show simulation
export const getSimulation = simulation => (
    $.ajax({
        url: '/api/simulation',
        method: 'GET',
        data: { simulation }
    })
);

// Delete simulation
export const deleteSimulation = simulation => (
    $.ajax({
        url: '/api/simulation',
        method: 'DELETE',
        headers: { 'X-CSRF-Token': AUTH_TOKEN },
        data: { simulation }
    })
);
