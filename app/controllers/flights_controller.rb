class FlightsController < ApplicationController
  before_action :set_flight, only: %i[ show edit update destroy ]

  # GET /flights or /flights.json
  def index

    if params[:ids] && !params[:ids].empty?
      @flights = Flight.where(id: params[:ids]).paginate(page: params[:page], per_page: 10)
      @total = @flights.length
    else
      @flights = Flight.all.paginate(page: params[:page], per_page: 10)
      @total = Flight.all.length
    end
  end

  # GET /flights/1 or /flights/1.json
  def show
    @flight = Flight.find_by(id: params[:id])
  end

  def search
    search = params[:query].downcase
    @flights = Flight.where("LOWER(origin) LIKE ? OR LOWER(destination) LIKE ?", "%#{search}%", "%#{search}%")
  end

  # POST /flights or /flights.json
  def create
    @flight = Flight.new(flight_params)
    if @flight.save
      render json: {
        message: 'flight created',
        status: :ok
      }
    else
      render json: @flight.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /flights/1 or /flights/1.json
  def update
    respond_to do |format|
      if @flight.update(flight_params)
        format.html { redirect_to @flight, notice: "Flight was successfully updated." }
        format.json { render :show, status: :ok, location: @flight }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /flights/1 or /flights/1.json
  def destroy
    @flight.destroy
    respond_to do |format|
      format.html { redirect_to flights_url, notice: "Flight was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_flight
    @flight = Flight.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def flight_params
    params.require(:data).permit(:arrival_time, :take_off_time, :destination, :origin, :seats_amount, :query, :ids)
  end
end
