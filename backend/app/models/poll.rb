class Poll < ApplicationRecord
    attr_accessor :name, :description, :type, :token
    after_initialize :set_token
    def set_token
        self.token = SecureRandom.urlsafe_base64(6)
    end
end
