class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: true
  validates_presence_of :first_name, :last_name, :password_digest
  before_create :set_user_role

  private

  def set_user_role
    unless self.user_role_id
      self.user_role_id = UserRole.find_by_name('user').id
    end
  end

end
