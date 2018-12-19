import { Injectable } from '@angular/core';
import { Place } from './places.service';

@Injectable({
  providedIn: 'root'
})
export class LocalGameDataService {

  private playerName: string;
  private places: Place[];
  private chosenPlace: Place;
  private host: boolean;
  private playerRole: string;
  private playerNames: string[];
  private lostGuess: string;
  private lostGuessed: boolean;
  private lostPlayerFound: boolean;
  private timeRanOut: boolean;
  private uniqueGuess: string;
  private placeGuess: string;
  private lostPlayer: string;
  private uniquePlayer: string;
  private correctUniqueGuesses: number;
  private correctLostGuesses: number;
  private points = 0;

  constructor() { }

  resetData() {
    this.chosenPlace = undefined;
    this.playerRole = undefined;
    this.lostGuess = undefined;
    this.lostGuessed = undefined;
    this.lostPlayerFound = undefined;
    this.timeRanOut = undefined;
    this.uniqueGuess = undefined;
    this.placeGuess = undefined;
    this.lostPlayer = undefined;
    this.uniquePlayer = undefined;
    this.correctUniqueGuesses = undefined;
    this.correctLostGuesses = undefined;
  }

  getPoints() {
    return this.points;
  }

  addPoints(add: number) {
    this.points += add;
  }

  getCorrectLostGuesses() {
    return this.correctLostGuesses;
  }

  setCorrectLostGuesses(guesses: number) {
    this.correctLostGuesses = guesses;
  }

  getCorrectUniqueGuesses() {
    return this.correctUniqueGuesses;
  }

  setCorrectUniqueGuesses(guesses: number) {
    this.correctUniqueGuesses = guesses;
  }

  getLostGuessed() {
    return this.lostGuessed;
  }

  setLostGuessed(heGuessed: boolean) {
    this.lostGuessed = heGuessed;
  }

  getLostPlayerFound() {
    return this.lostPlayerFound;
  }

  setLostPlayerFound(found: boolean) {
    this.lostPlayerFound = found;
  }

  getTimeRanOut() {
    return this.timeRanOut;
  }

  setTimeRanOut(ranOut: boolean) {
    this.timeRanOut = ranOut;
  }

  getLostPlayer() {
    return this.lostPlayer;
  }

  setLostPlayer(playerName: string) {
    this.lostPlayer = playerName;
  }

  getUniquePlayer() {
    return this.uniquePlayer;
  }

  setUniquePlayer(playerName: string) {
    this.uniquePlayer = playerName;
  }

  getLostGuess() {
    return this.lostGuess;
  }

  setLostGuess(lostGuess: string) {
    this.lostGuess = lostGuess;
  }

  getUniqueGuess() {
    return this.uniqueGuess;
  }

  setUniqueGuess(uniqueGuess: string) {
    this.uniqueGuess = uniqueGuess;
  }

  getPlaceGuess() {
    return this.placeGuess;
  }

  setPlaceGuess(placeGuess: string) {
    this.placeGuess = placeGuess;
  }

  getPlayerName() {
    return this.playerName;
  }

  setPlayerName(name: string) {
    this.playerName = name;
  }

  getPlayerNames() {
    return this.playerNames;
  }

  setPlayerNames(playerNames: string[]) {
    this.playerNames = playerNames;
  }

  getPlaces() {
    return this.places;
  }

  setPlaces(places: Place[]) {
    this.places = places;
  }

  getChosenPlace() {
    return this.chosenPlace;
  }

  setChosenPlace(place: Place) {
    this.chosenPlace = place;
  }

  isHost() {
    return this.host;
  }

  setIsHost(host: boolean) {
    this.host = host;
  }

  getPlayerRole() {
    return this.playerRole;
  }

  setPlayerRole(role: string) {
    this.playerRole = role;
  }

}
