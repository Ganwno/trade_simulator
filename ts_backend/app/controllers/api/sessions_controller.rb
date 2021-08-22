class Api::SessionsController < ApplicationController
    # Verify the username/password and set the session token
    def create
        user = User.find_by_credentials(
        params[:user][:username],
        params[:user][:password]
        )
        if user.nil?
        # either username not found or password incorrect
            render :new
        else
        # sign in the user
            puts "\nWelcome back #{user.username}\n"
            login!(user)
            redirect_to user_url(user)
        end
    end


    def destroy
    # sign out
        if current_user.nil?
            # if there is no user to logout
            # render a 404 message
            render json: {404}
        else
            # If there is a current user
            # render an empty {} upon successful logout
            logout!
            render json: {}
        end
    end
end
