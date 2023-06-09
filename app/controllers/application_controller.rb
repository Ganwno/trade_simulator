class ApplicationController < ActionController::Base
    # make current_user available in all views
    helper_method :current_user, :current_simulation

    def login!(user)
        @current_user = user
        session[:session_token] = user.session_token
    end


    def logout!
        current_user.try(:reset_session_token!)
        session[:session_token] = nil
    end


    def current_user
        return nil if session[:session_token].nil?
        @current_user ||= User.find_by(session_token: session[:session_token])
    end


    def require_current_user!
        # direct non-logged in users to new_session_url
        redirect_to new_session_url if current_user.nil?
    end

    def load_simulation!(simulation)
        @current_simulation = simulation
        session[:simulation_id] = simulation.id
    end

    def current_simulation
        return nil if session[:simulation_id].nil?
        @current_simulation ||= Simulation.find_by(id: session[:simulation_id])
    end

end
