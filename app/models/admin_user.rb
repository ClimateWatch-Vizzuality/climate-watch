class AdminUser < SecondBase::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :validatable

  validates :role, inclusion: {in: %w(superuser admin), message: '%{value} is not a valid role'}

  def superuser?
    role.eql?('superuser')
  end
end
